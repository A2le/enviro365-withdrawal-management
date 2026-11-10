package com.enviro.assessment.junior.giftntintili.service;

import com.enviro.assessment.junior.giftntintili.dto.WithdrawalRequest;
import com.enviro.assessment.junior.giftntintili.dto.WithdrawalResponse;
import com.enviro.assessment.junior.giftntintili.entity.Product;
import com.enviro.assessment.junior.giftntintili.entity.ProductType;
import com.enviro.assessment.junior.giftntintili.entity.Withdrawal;
import com.enviro.assessment.junior.giftntintili.exception.BusinessRuleException;
import com.enviro.assessment.junior.giftntintili.exception.ResourceNotFoundException;
import com.enviro.assessment.junior.giftntintili.repository.ProductRepository;
import com.enviro.assessment.junior.giftntintili.repository.WithdrawalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.format.DateTimeFormatter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Contains business logic for withdrawal creation and validation.
 */
@Service
@RequiredArgsConstructor
public class WithdrawalService {



    private final ProductRepository productRepository;
    private final WithdrawalRepository withdrawalRepository;

    private static final DateTimeFormatter CSV_DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * Creates a withdrawal after validating all business rules.
     */
    @Transactional
    public WithdrawalResponse createWithdrawal(WithdrawalRequest request, Long investorId) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product with ID " + request.productId() + " was not found"
                        )
                );

        if (!product.getInvestor().getId().equals(investorId)) {
            throw new ResourceNotFoundException("Product was not found for this investor");
        }

        validateWithdrawal(product, request.amount());

        BigDecimal remainingBalance = product.getBalance().subtract(request.amount());

        product.setBalance(remainingBalance);

        Withdrawal withdrawal = Withdrawal.builder()
                .product(product)
                .amount(request.amount())
                .remainingBalance(remainingBalance)
                .withdrawalDate(LocalDateTime.now())
                .build();

        Withdrawal savedWithdrawal = withdrawalRepository.save(withdrawal);
        productRepository.save(product);

        return new WithdrawalResponse(
                savedWithdrawal.getId(),
                product.getId(),
                product.getName(),
                savedWithdrawal.getAmount(),
                savedWithdrawal.getWithdrawalDate(),
                remainingBalance
        );
    }

    /**
     * Validates withdrawal rules:
     * 1. Retirement withdrawals require investor age greater than 65.
     * 2. Withdrawal cannot exceed product balance.
     * 3. Withdrawal cannot exceed 90% of product balance.
     */
    private void validateWithdrawal(Product product, BigDecimal amount) {
        if (product.getType() == ProductType.RETIREMENT
                && product.getInvestor().getAge() <= 65) {
            throw new BusinessRuleException(
                    "Retirement withdrawals are only allowed for investors older than 65"
            );
        }

        if (amount.compareTo(product.getBalance()) > 0) {
            throw new BusinessRuleException(
                    "Withdrawal amount cannot exceed product balance"
            );
        }

        BigDecimal maxWithdrawal = product.getBalance().multiply(new BigDecimal("0.90"));

        if (amount.compareTo(maxWithdrawal) > 0) {
            throw new BusinessRuleException(
                    "Withdrawal amount cannot exceed 90% of the product balance"
            );
        }
    }

    /**
     * Retrieves all withdrawal records.
     */
    @Transactional(readOnly = true)
    public List<WithdrawalResponse> getWithdrawals(Long investorId) {
        return withdrawalRepository.findByProductInvestorId(investorId)
                .stream()
                .map(withdrawal -> new WithdrawalResponse(
                        withdrawal.getId(),
                        withdrawal.getProduct().getId(),
                        withdrawal.getProduct().getName(),
                        withdrawal.getAmount(),
                        withdrawal.getWithdrawalDate(),
                        withdrawal.getRemainingBalance()
                ))
                .toList();
    }

    /**
     * Exports withdrawals as formatted CSV text.
     *
     * Exports only withdrawals belonging to the authenticated investor.
     */
    @Transactional(readOnly = true)
    public String exportWithdrawalsToCsv(Long investorId) {
        StringBuilder csv = new StringBuilder();

        csv.append("Withdrawal ID,Product ID,Product Name,Amount,Withdrawal Date,Remaining Balance\n");

        List<Withdrawal> withdrawals = withdrawalRepository.findByProductInvestorId(investorId);

        withdrawals.forEach(withdrawal -> {
            csv.append(withdrawal.getId()).append(",");
            csv.append(withdrawal.getProduct().getId()).append(",");
            csv.append(escapeCsv(withdrawal.getProduct().getName())).append(",");
            csv.append(formatMoney(withdrawal.getAmount())).append(",");
            csv.append(withdrawal.getWithdrawalDate().format(CSV_DATE_FORMATTER)).append(",");
            csv.append(formatMoney(withdrawal.getRemainingBalance())).append("\n");
        });

        return csv.toString();
    }

    /**
     * Formats money values for easier reading in CSV exports.
     */
    private String formatMoney(BigDecimal amount) {
        return "\"R " + amount.toPlainString() + "\"";
    }

    /**
     * Escapes CSV text values so commas or quotes do not break the CSV format.
     */
    private String escapeCsv(String value) {
        if (value == null) {
            return "";
        }

        String escapedValue = value.replace("\"", "\"\"");

        return "\"" + escapedValue + "\"";
    }
}