package com.enviro.assessment.junior.giftntintili.repository;

import com.enviro.assessment.junior.giftntintili.entity.Investor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for performing database operations on Investor records.
 *
 * JpaRepository gives us built-in methods like:
 * - findById()
 * - findAll()
 * - save()
 * - deleteById()
 */
@Repository
public interface InvestorRepository extends JpaRepository<Investor, Long> {
}