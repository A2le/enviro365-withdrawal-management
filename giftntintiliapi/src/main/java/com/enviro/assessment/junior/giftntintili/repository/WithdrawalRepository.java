package com.enviro.assessment.junior.giftntintili.repository;

import com.enviro.assessment.junior.giftntintili.entity.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for performing database operations on Withdrawal records.
 */
@Repository
public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {

    /**
     * Finds all withdrawals linked to a specific product.
     */
    List<Withdrawal> findByProductId(Long productId);

    /**
     * Finds all withdrawals belonging to a specific investor.
     *
     * This works by navigating:
     * Withdrawal -> Product -> Investor -> ID
     */
    List<Withdrawal> findByProductInvestorId(Long investorId);
}