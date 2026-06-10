package com.enviro.assessment.junior.giftntintili.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Represents an investment product owned by an investor.
 *
 * Each product has:
 * - A product name
 * - A current balance
 * - A product type
 * - An owning investor
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    /**
     * Primary key for the product table.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Display name of the investment product.
     */
    private String name;

    /**
     * Current available balance of the product.
     *
     * BigDecimal is used instead of double because this is money.
     */
    private BigDecimal balance;

    /**
     * Product category.
     *
     * Stored as text in the database, for example:
     * RETIREMENT or SAVINGS.
     */
    @Enumerated(EnumType.STRING)
    private ProductType type;

    /**
     * Many products can belong to one investor.
     */
    @ManyToOne
    @JoinColumn(name = "investor_id")
    private Investor investor;
}