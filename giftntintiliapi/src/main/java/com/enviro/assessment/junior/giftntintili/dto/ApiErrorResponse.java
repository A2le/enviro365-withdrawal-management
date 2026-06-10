package com.enviro.assessment.junior.giftntintili.dto;

import java.time.LocalDateTime;

/**
 * Standard API error response returned by exception handlers.
 */
public record ApiErrorResponse(
        LocalDateTime timestamp,
        int status,
        String message
) {
}