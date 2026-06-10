package com.enviro.assessment.junior.giftntintili.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a withdrawal request made against a product.
 *
 * The withdrawal is linked to a specific product.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Withdrawal {

    /**
     * Primary key for the withdrawal table.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Amount the investor wants to withdraw.
     */
    private BigDecimal amount;

    private BigDecimal remainingBalance;

    /**
     * Date and time when the withdrawal was created.
     */
    private LocalDateTime withdrawalDate;

    /**
     * The product from which the money is withdrawn.
     */
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}