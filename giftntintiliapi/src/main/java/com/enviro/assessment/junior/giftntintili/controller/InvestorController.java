package com.enviro.assessment.junior.giftntintili.controller;

import com.enviro.assessment.junior.giftntintili.dto.PortfolioResponse;
import com.enviro.assessment.junior.giftntintili.entity.AppUser;
import com.enviro.assessment.junior.giftntintili.exception.ResourceNotFoundException;
import com.enviro.assessment.junior.giftntintili.repository.AppUserRepository;
import com.enviro.assessment.junior.giftntintili.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {
    private final InvestorService investorService;
    private final AppUserRepository appUserRepository;

    /** Investor identity comes from Basic Auth, never from a caller-supplied ID. */
    @GetMapping("/me/portfolio")
    public PortfolioResponse getMyPortfolio(Authentication authentication) {
        AppUser user = appUserRepository.findWithInvestorByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User account not found"));
        return investorService.getPortfolio(user.getInvestor().getId());
    }
}
