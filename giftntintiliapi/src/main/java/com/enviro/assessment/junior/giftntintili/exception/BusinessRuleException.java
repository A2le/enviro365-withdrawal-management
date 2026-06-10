package com.enviro.assessment.junior.giftntintili.exception;

/**
 * Custom exception used when a withdrawal violates a business rule.
 */
public class BusinessRuleException extends RuntimeException {

    public BusinessRuleException(String message) {
        super(message);
    }
}