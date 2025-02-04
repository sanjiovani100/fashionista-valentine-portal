-- Create about_page_content table function
create or replace function create_about_page_table()
returns void
language plpgsql
security definer
as $$
begin
  -- Create the table if it doesn't exist
  create table if not exists about_page_content (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text not null,
    content jsonb not null default '{}'::jsonb,
    meta_description text,
    meta_keywords text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );

  -- Create RLS policies
  alter table about_page_content enable row level security;

  -- Allow public read access
  create policy "Allow public read access"
    on about_page_content
    for select
    to public
    using (true);

  -- Allow authenticated users to insert/update
  create policy "Allow authenticated insert"
    on about_page_content
    for insert
    to authenticated
    with check (true);

  create policy "Allow authenticated update"
    on about_page_content
    for update
    to authenticated
    using (true)
    with check (true);

  -- Create updated_at trigger
  create or replace function update_updated_at_column()
  returns trigger
  language plpgsql
  as $$
  begin
    new.updated_at = now();
    return new;
  end;
  $$;

  create trigger update_about_page_content_updated_at
    before update
    on about_page_content
    for each row
    execute function update_updated_at_column();
end;
$$; 