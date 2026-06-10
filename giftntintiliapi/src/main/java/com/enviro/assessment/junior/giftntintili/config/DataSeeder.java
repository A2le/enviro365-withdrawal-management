package com.enviro.assessment.junior.giftntintili.config;

import com.enviro.assessment.junior.giftntintili.entity.Investor;
import com.enviro.assessment.junior.giftntintili.entity.Product;
import com.enviro.assessment.junior.giftntintili.entity.ProductType;
import com.enviro.assessment.junior.giftntintili.repository.InvestorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * populates the in-memory H2 database with sample data when the application starts.
 *
 * This is useful because it allows the APIs and my frontend
 * to work immediately without needing a separate investor/product creation flow.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final InvestorRepository investorRepository;

    /**
     * Runs automatically after Spring Boot starts.
     */
    @Override
    public void run(String... args) {
        if (investorRepository.count() > 0) {
            return;
        }

        Investor olderInvestor = Investor.builder()
                .name("John Smith")
                .age(70)
                .build();

        Product retirementProduct = Product.builder()
                .name("Retirement Annuity")
                .type(ProductType.RETIREMENT)
                .balance(new BigDecimal("500000"))
                .investor(olderInvestor)
                .build();

        Product savingsProduct = Product.builder()
                .name("Tax Free Savings")
                .type(ProductType.SAVINGS)
                .balance(new BigDecimal("150000"))
                .investor(olderInvestor)
                .build();

        olderInvestor.setProducts(List.of(retirementProduct, savingsProduct));

        Investor youngerInvestor = Investor.builder()
                .name("Mary Johnson")
                .age(45)
                .build();

        Product youngerRetirementProduct = Product.builder()
                .name("Retirement Fund")
                .type(ProductType.RETIREMENT)
                .balance(new BigDecimal("300000"))
                .investor(youngerInvestor)
                .build();

        Product youngerSavingsProduct = Product.builder()
                .name("Money Market Savings")
                .type(ProductType.SAVINGS)
                .balance(new BigDecimal("80000"))
                .investor(youngerInvestor)
                .build();

        youngerInvestor.setProducts(List.of(youngerRetirementProduct, youngerSavingsProduct));

        investorRepository.saveAll(List.of(olderInvestor, youngerInvestor));
    }
}