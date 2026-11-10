package com.enviro.assessment.junior.giftntintili.repository;

import com.enviro.assessment.junior.giftntintili.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    @EntityGraph(attributePaths = "investor")
    Optional<AppUser> findWithInvestorByUsername(String username);
    boolean existsByUsername(String username);
}
