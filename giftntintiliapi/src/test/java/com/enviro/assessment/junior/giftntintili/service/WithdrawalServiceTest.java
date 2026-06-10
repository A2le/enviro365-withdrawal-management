package com.enviro.assessment.junior.giftntintili.service;

import com.enviro.assessment.junior.giftntintili.dto.WithdrawalRequest;
import com.enviro.assessment.junior.giftntintili.entity.*;
import com.enviro.assessment.junior.giftntintili.exception.BusinessRuleException;
import com.enviro.assessment.junior.giftntintili.repository.ProductRepository;
import com.enviro.assessment.junior.giftntintili.repository.WithdrawalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class WithdrawalServiceTest {

    private ProductRepository productRepository;
    private WithdrawalService withdrawalService;

    @BeforeEach
    void setup() {
        productRepository = Mockito.mock(ProductRepository.class);
        WithdrawalRepository withdrawalRepository = Mockito.mock(WithdrawalRepository.class);

        withdrawalService = new WithdrawalService(
                productRepository,
                withdrawalRepository
        );
    }

    @Test
    void shouldRejectRetirementWithdrawalWhenInvestorIsUnder65() {

        Investor investor = Investor.builder()
                .id(1L)
                .name("Mary")
                .age(45)
                .build();

        Product product = Product.builder()
                .id(1L)
                .type(ProductType.RETIREMENT)
                .balance(new BigDecimal("100000"))
                .investor(investor)
                .build();

        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        WithdrawalRequest request =
                new WithdrawalRequest(
                        1L,
                        new BigDecimal("1000")
                );

        assertThrows(
                BusinessRuleException.class,
                () -> withdrawalService.createWithdrawal(request)
        );
    }

    @Test
    void shouldRejectWithdrawalGreaterThanBalance() {

        Investor investor = Investor.builder()
                .age(70)
                .build();

        Product product = Product.builder()
                .id(1L)
                .type(ProductType.SAVINGS)
                .balance(new BigDecimal("1000"))
                .investor(investor)
                .build();

        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        WithdrawalRequest request =
                new WithdrawalRequest(
                        1L,
                        new BigDecimal("2000")
                );

        assertThrows(
                BusinessRuleException.class,
                () -> withdrawalService.createWithdrawal(request)
        );
    }

    @Test
    void shouldRejectWithdrawalGreaterThanNinetyPercent() {

        Investor investor = Investor.builder()
                .age(70)
                .build();

        Product product = Product.builder()
                .id(1L)
                .type(ProductType.SAVINGS)
                .balance(new BigDecimal("100000"))
                .investor(investor)
                .build();

        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        WithdrawalRequest request =
                new WithdrawalRequest(
                        1L,
                        new BigDecimal("95000")
                );

        assertThrows(
                BusinessRuleException.class,
                () -> withdrawalService.createWithdrawal(request)
        );
    }
}