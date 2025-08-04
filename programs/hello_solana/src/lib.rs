use anchor_lang::prelude::*;

declare_id!("13xv7grzU9AXt7S4dH51ZuyKwmgduTbtM6WBKk3B4FBq");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
