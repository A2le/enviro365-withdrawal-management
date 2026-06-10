package com.enviro.assessment.junior.giftntintili.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response object returned after a successful withdrawal.
 */
public record WithdrawalResponse(
        Long id,
        Long productId,
        String productName,
        BigDecimal amount,
        LocalDateTime withdrawalDate,
        BigDecimal remainingBalance
) {
}