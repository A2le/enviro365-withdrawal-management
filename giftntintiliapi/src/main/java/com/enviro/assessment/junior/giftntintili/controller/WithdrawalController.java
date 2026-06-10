package com.enviro.assessment.junior.giftntintili.controller;

import com.enviro.assessment.junior.giftntintili.dto.WithdrawalRequest;
import com.enviro.assessment.junior.giftntintili.dto.WithdrawalResponse;
import com.enviro.assessment.junior.giftntintili.service.WithdrawalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Exposes withdrawal-related REST endpoints.
 */
@RestController
@RequestMapping("/api/withdrawals")
@RequiredArgsConstructor
public class WithdrawalController {

    private final WithdrawalService withdrawalService;

    /**
     * Creates a withdrawal request.
     *
     * Example:
     * POST /api/withdrawals
     */
    @PostMapping
    public WithdrawalResponse createWithdrawal(
            @Valid @RequestBody WithdrawalRequest request
    ) {
        return withdrawalService.createWithdrawal(request);
    }

    /**
     * Gets all withdrawal records.
     *
     * Example:
     * GET /api/withdrawals
     */
    @GetMapping
    public List<WithdrawalResponse> getAllWithdrawals() {
        return withdrawalService.getAllWithdrawals();
    }

    /**
     * Exports withdrawal records as a downloadable CSV file.
     *
     * Optional filter:
     * GET /api/withdrawals/export?investorId=1
     */
    @GetMapping("/export")
    public ResponseEntity<String> exportWithdrawals(
            @RequestParam(required = false) Long investorId
    ) {
        String csvData = withdrawalService.exportWithdrawalsToCsv(investorId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=withdrawals.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvData);
    }
}