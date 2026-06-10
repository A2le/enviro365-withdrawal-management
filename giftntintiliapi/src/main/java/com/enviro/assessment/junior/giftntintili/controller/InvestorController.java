package com.enviro.assessment.junior.giftntintili.controller;

import com.enviro.assessment.junior.giftntintili.dto.PortfolioResponse;
import com.enviro.assessment.junior.giftntintili.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * Exposes investor-related REST endpoints.
 */
@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {

    private final InvestorService investorService;

    /**
     * Gets the portfolio for a specific investor.
     *
     * Example:
     * GET /api/investors/1/portfolio
     */
    @GetMapping("/{investorId}/portfolio")
    public PortfolioResponse getPortfolio(@PathVariable Long investorId) {
        return investorService.getPortfolio(investorId);
    }
}