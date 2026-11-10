package com.enviro.assessment.junior.giftntintili.entity;

import jakarta.persistence.*;
import lombok.*;

/** Login account linked to exactly one investor portfolio. */
@Entity
@Table(name = "app_users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToOne(optional = false)
    @JoinColumn(name = "investor_id", nullable = false, unique = true)
    private Investor investor;
}
