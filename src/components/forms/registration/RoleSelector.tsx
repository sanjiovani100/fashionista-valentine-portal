import React from 'react';
import { Button } from '@/components/ui/button';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

export const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <Button
        onClick={() => onRoleSelect('model')}
        variant={selectedRole === 'model' ? 'default' : 'outline'}
        className={`min-w-[120px] ${
          selectedRole === 'model' 
            ? 'bg-gradient-to-r from-fashion-pink to-deep-purple' 
            : 'hover:bg-fashion-pink/10'
        }`}
      >
        Model
      </Button>
      <Button
        onClick={() => onRoleSelect('designer')}
        variant={selectedRole === 'designer' ? 'default' : 'outline'}
        className={`min-w-[120px] ${
          selectedRole === 'designer' 
            ? 'bg-gradient-to-r from-fashion-pink to-deep-purple' 
            : 'hover:bg-fashion-pink/10'
        }`}
      >
        Designer
      </Button>
      <Button
        onClick={() => onRoleSelect('sponsor')}
        variant={selectedRole === 'sponsor' ? 'default' : 'outline'}
        className={`min-w-[120px] ${
          selectedRole === 'sponsor' 
            ? 'bg-gradient-to-r from-fashion-pink to-deep-purple' 
            : 'hover:bg-fashion-pink/10'
        }`}
      >
        Sponsor
      </Button>
    </div>
  );
};