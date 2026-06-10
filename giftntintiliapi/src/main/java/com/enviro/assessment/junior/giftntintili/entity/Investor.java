package com.enviro.assessment.junior.giftntintili.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Represents an investor/customer in the system.
 *
 * An investor can own multiple investment products, such as:
 * - Retirement products
 * - Savings products
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Investor {

    /**
     * Primary key for the investor table.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Full name of the investor.
     */
    private String name;

    /**
     * Age is required because retirement product withdrawals
     * are only allowed when the investor is older than 65.
     */
    private int age;

    /**
     * One investor can have many products.
     *
     * mappedBy = "investor" means the Product entity owns the relationship.
     * cascade = CascadeType.ALL means products are saved/deleted together with the investor.
     */
    @OneToMany(mappedBy = "investor", cascade = CascadeType.ALL)
    private List<Product> products;
}