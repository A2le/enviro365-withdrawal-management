package com.enviro.assessment.junior.giftntintili.entity;

/**
 * Represents the different investment product categories supported by the system.
 *
 * RETIREMENT products have extra withdrawal rules:
 * - Investor must be older than 65.
 *
 * SAVINGS products follow the normal withdrawal rules.
 */
public enum ProductType {
    RETIREMENT,
    SAVINGS
}