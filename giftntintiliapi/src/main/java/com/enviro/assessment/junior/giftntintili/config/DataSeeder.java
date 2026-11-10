package com.enviro.assessment.junior.giftntintili.config;

import com.enviro.assessment.junior.giftntintili.entity.*;
import com.enviro.assessment.junior.giftntintili.repository.AppUserRepository;
import com.enviro.assessment.junior.giftntintili.repository.InvestorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final InvestorRepository investorRepository;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${enviro365.demo.john.password:John123!}") private String johnPassword;
    @Value("${enviro365.demo.mary.password:Mary123!}") private String maryPassword;

    @Override
    public void run(String... args) {
        if (investorRepository.count() == 0) {
            Investor john = Investor.builder().name("John Smith").age(70).build();
            Product johnRetirement = Product.builder().name("Retirement Annuity").type(ProductType.RETIREMENT).balance(new BigDecimal("500000")).investor(john).build();
            Product johnSavings = Product.builder().name("Tax Free Savings").type(ProductType.SAVINGS).balance(new BigDecimal("150000")).investor(john).build();
            john.setProducts(List.of(johnRetirement, johnSavings));

            Investor mary = Investor.builder().name("Mary Johnson").age(45).build();
            Product maryRetirement = Product.builder().name("Retirement Fund").type(ProductType.RETIREMENT).balance(new BigDecimal("300000")).investor(mary).build();
            Product marySavings = Product.builder().name("Money Market Savings").type(ProductType.SAVINGS).balance(new BigDecimal("80000")).investor(mary).build();
            mary.setProducts(List.of(maryRetirement, marySavings));
            investorRepository.saveAll(List.of(john, mary));
        }

        createAccountIfMissing("john.smith", johnPassword, "John Smith");
        createAccountIfMissing("mary.johnson", maryPassword, "Mary Johnson");
    }

    private void createAccountIfMissing(String username, String rawPassword, String investorName) {
        if (appUserRepository.existsByUsername(username)) return;
        Investor investor = investorRepository.findAll().stream()
                .filter(item -> item.getName().equals(investorName)).findFirst()
                .orElseThrow(() -> new IllegalStateException("Missing seeded investor: " + investorName));
        appUserRepository.save(AppUser.builder().username(username)
                .password(passwordEncoder.encode(rawPassword)).investor(investor).build());
    }
}
