package com.enviro.assessment.junior.giftntintili.dto;

import java.util.List;

/**
 * Response object used to return an investor's portfolio.
 */
public record PortfolioResponse(
        Long investorId,
        String investorName,
        int age,
        List<ProductResponse> products
) {
}