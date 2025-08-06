// use anchor_lang::prelude::*;

// declare_id!("13xv7grzU9AXt7S4dH51ZuyKwmgduTbtM6WBKk3B4FBq");

// #[program]
// pub mod hello_solana {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>, message: String) -> Result<()> {
//         let base_account = &mut ctx.accounts.base_account;
//         base_account.greeting = message;
//         Ok(())
//     }

//     pub fn update(ctx: Context<Update>, new_message: String) -> Result<()> {
//         let base_account = &mut ctx.accounts.base_account;
//         base_account.greeting = new_message;
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(init, payer = user, space = 8 + 64)]
//     pub base_account: Account<'info, GreetingAccount>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct Update<'info> {
//     #[account(mut)]
//     pub base_account: Account<'info, GreetingAccount>,
// }

// #[account]
// pub struct GreetingAccount {
//     pub greeting: String,
// }

// ---------------------------------------------------------------------------------------------- //
use anchor_lang::prelude::*;

declare_id!("13xv7grzU9AXt7S4dH51ZuyKwmgduTbtM6WBKk3B4FBq");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.owner = ctx.accounts.user.key();
        base_account.amount = 0;
        base_account.self_greets = 0;
        Ok(())
    }

    pub fn greet(ctx: Context<Greet>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let user_key = ctx.accounts.user.key();

        if user_key == base_account.owner {
            base_account.self_greets += 1;
        } else {
            base_account.amount += 1;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 8)] // => Discrimnator + Pubkey + u64 + u64
    pub base_account: Account<'info, GreetingUser>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Greet<'info> {
    #[account(mut)]
    pub base_account: Account<'info, GreetingUser>,
    pub user: Signer<'info>,
}

#[account]
pub struct GreetingUser {
    pub owner: Pubkey,
    pub amount: u64,
    pub self_greets: u64,
}
