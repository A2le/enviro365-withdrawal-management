package com.enviro.assessment.junior.giftntintili.service;

import com.enviro.assessment.junior.giftntintili.dto.PortfolioResponse;
import com.enviro.assessment.junior.giftntintili.dto.ProductResponse;
import com.enviro.assessment.junior.giftntintili.entity.Investor;
import com.enviro.assessment.junior.giftntintili.exception.ResourceNotFoundException;
import com.enviro.assessment.junior.giftntintili.repository.InvestorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Contains business logic related to investors.
 */
@Service
@RequiredArgsConstructor
public class InvestorService {

    private final InvestorRepository investorRepository;

    /**
     * Retrieves an investor and their products.
     *
     * @param investorId ID of the investor
     * @return portfolio response containing investor and product details
     */
    public PortfolioResponse getPortfolio(Long investorId) {
        Investor investor = investorRepository.findById(investorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Investor with ID " + investorId + " was not found"
                        )
                );

        List<ProductResponse> products = investor.getProducts()
                .stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getType(),
                        product.getBalance()
                ))
                .toList();

        return new PortfolioResponse(
                investor.getId(),
                investor.getName(),
                investor.getAge(),
                products
        );
    }
}