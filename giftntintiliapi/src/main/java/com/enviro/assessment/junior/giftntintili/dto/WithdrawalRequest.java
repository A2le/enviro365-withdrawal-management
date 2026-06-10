package com.enviro.assessment.junior.giftntintili.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

/**
 * Request object used when creating a withdrawal.
 */
public record WithdrawalRequest(

        @NotNull(message = "Product ID is required")
        Long productId,

        @NotNull(message = "Withdrawal amount is required")
        @Positive(message = "Withdrawal amount must be greater than zero")
        BigDecimal amount
) {
}