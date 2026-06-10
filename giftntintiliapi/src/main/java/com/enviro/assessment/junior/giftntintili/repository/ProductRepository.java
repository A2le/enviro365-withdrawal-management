package com.enviro.assessment.junior.giftntintili.repository;

import com.enviro.assessment.junior.giftntintili.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for performing database operations on Product records.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Finds all products that belong to a specific investor.
     *
     * Spring Data JPA automatically builds the query based on the method name.
     */
    List<Product> findByInvestorId(Long investorId);
}