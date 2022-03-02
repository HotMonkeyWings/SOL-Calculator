use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod calculator {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtraction>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 / num2;
        calculator.remainder = num1 % num2;
        Ok(())
    }
}

/**
 * Since Context<Addition points towards the account for addition, we
 * need to send the calculator account to the function where its called!
 * We'll be making similiar structures for the other 3 Operations.
 *
 * The `mut` parameter indicates that the account will be altered. This is good for
 * persisting changes like calculations!
 */
#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
/**
 * Three accounts will be created. 
 * 
 * The first account has 3 parameters:
 *      - init: Macro used to create a new account owned by the current program
 *      - payer: The one who will pay to create the new account
 *      - space: Space required for the application
 * 
 * The Signer type for the second account enforces the constraint that the `authority` account signed the transaction.
 * 
 * The system_program account is just system specs for the SOL blockchain in the form of an account
 * 
 * For signer and mut, we can use `@<custom-error>` to define custom errors.
 * 
 * Check https://docs.rs/anchor-lang/0.18.0/anchor_lang/derive.Accounts.html for more account types.
 */
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 64 + 64 + 64 + 64)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
/**
 * An account is used as a contract in Solana. This defines our calculator account.
 * The macro #[account] tells anchor to convert struct into an account
 *  */
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}
