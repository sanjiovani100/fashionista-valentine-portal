import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@/middleware/validate-request';
import { requireAuth } from '@/middleware/require-auth';
import { supabase } from '@/lib/supabase/config';
import { logger } from '@/config/logger';
import { v4 as uuidv4 } from 'uuid';
import type { RequestHandler } from 'express';
import type { User } from '@supabase/supabase-js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

const router = Router();

// Validation schemas
const allocationSchema = z.object({
  sponsor_id: z.string().uuid(),
  event_id: z.string().uuid(),
  ticket_type: z.string(),
  quantity_allocated: z.number().positive(),
  allocation_expiry: z.string().datetime().optional()
});

const redemptionSchema = z.object({
  allocation_id: z.string().uuid(),
  redeemed_by: z.string().uuid()
});

// Route handlers
const createAllocation: RequestHandler = async (req, res) => {
  try {
    const { data: allocation, error } = await supabase
      .from('sponsor_ticket_allocations')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    logger.info('Created sponsor ticket allocation', { allocation_id: allocation.id });
    
    return res.status(201).json({
      status: 'success',
      data: allocation
    });
  } catch (error) {
    logger.error('Error creating sponsor ticket allocation:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create sponsor ticket allocation'
    });
  }
};

const getAllocations: RequestHandler = async (req, res) => {
  try {
    const { data: allocations, error } = await supabase
      .from('sponsor_ticket_allocations')
      .select(`
        *,
        events (title, date),
        sponsor_ticket_redemptions (
          id,
          redeemed_by,
          redeemed_at,
          status
        )
      `)
      .eq('sponsor_id', req.params.sponsorId);

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      data: allocations
    });
  } catch (error) {
    logger.error('Error fetching sponsor ticket allocations:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch sponsor ticket allocations'
    });
  }
};

const redeemTicket: RequestHandler = async (req, res) => {
  const { allocation_id, redeemed_by } = req.body;

  try {
    // Check allocation availability
    const { data: isAvailable } = await supabase
      .rpc('check_allocation_availability', { allocation_id });

    if (!isAvailable) {
      return res.status(400).json({
        status: 'error',
        message: 'Ticket allocation is not available'
      });
    }

    // Start a transaction
    const { data: allocation, error: allocationError } = await supabase
      .from('sponsor_ticket_allocations')
      .select('quantity_used, quantity_allocated')
      .eq('id', allocation_id)
      .single();

    if (allocationError) throw allocationError;

    // Create redemption record
    const { data: redemption, error: redemptionError } = await supabase
      .from('sponsor_ticket_redemptions')
      .insert([{
        allocation_id,
        redeemed_by,
        ticket_code: uuidv4(),
        status: 'active'
      }])
      .select()
      .single();

    if (redemptionError) throw redemptionError;

    // Update allocation usage
    const { error: updateError } = await supabase
      .from('sponsor_ticket_allocations')
      .update({ quantity_used: allocation.quantity_used + 1 })
      .eq('id', allocation_id);

    if (updateError) throw updateError;

    logger.info('Redeemed sponsor ticket', { redemption_id: redemption.id });

    return res.status(200).json({
      status: 'success',
      data: redemption
    });
  } catch (error) {
    logger.error('Error redeeming sponsor ticket:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to redeem sponsor ticket'
    });
  }
};

const getRedemptions: RequestHandler = async (req, res) => {
  try {
    const { data: redemptions, error } = await supabase
      .from('sponsor_ticket_redemptions')
      .select(`
        *,
        redeemed_by_user:redeemed_by (
          email,
          user_metadata
        )
      `)
      .eq('allocation_id', req.params.allocationId);

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      data: redemptions
    });
  } catch (error) {
    logger.error('Error fetching sponsor ticket redemptions:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch sponsor ticket redemptions'
    });
  }
};

// Routes
router.post('/allocations', requireAuth, validateRequest({ body: allocationSchema }), createAllocation);
router.get('/allocations/:sponsorId', requireAuth, getAllocations);
router.post('/redeem', requireAuth, validateRequest({ body: redemptionSchema }), redeemTicket);
router.get('/redemptions/:allocationId', requireAuth, getRedemptions);

export { router as sponsorTicketRoutes }; 


