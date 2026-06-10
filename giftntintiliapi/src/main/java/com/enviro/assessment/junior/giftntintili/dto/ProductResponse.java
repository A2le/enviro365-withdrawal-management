package com.enviro.assessment.junior.giftntintili.dto;

import com.enviro.assessment.junior.giftntintili.entity.ProductType;

import java.math.BigDecimal;

/**
 * Response object used to expose product details in the portfolio API.
 */
public record ProductResponse(
        Long id,
        String name,
        ProductType type,
        BigDecimal balance
) {
}