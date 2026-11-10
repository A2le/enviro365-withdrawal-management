package com.enviro.assessment.junior.giftntintili.controller;

import com.enviro.assessment.junior.giftntintili.dto.AuthResponse;
import com.enviro.assessment.junior.giftntintili.entity.AppUser;
import com.enviro.assessment.junior.giftntintili.exception.ResourceNotFoundException;
import com.enviro.assessment.junior.giftntintili.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AppUserRepository appUserRepository;

    /** Called by React after setting Basic credentials to verify the account. */
    @GetMapping("/me")
    public AuthResponse currentUser(Authentication authentication) {
        AppUser user = appUserRepository.findWithInvestorByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User account not found"));
        return new AuthResponse(user.getUsername(), user.getInvestor().getName(), user.getInvestor().getId());
    }
}
