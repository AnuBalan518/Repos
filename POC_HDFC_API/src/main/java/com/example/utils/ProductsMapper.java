package com.example.utils;

import com.example.dto.ProductsDTO;
import com.example.service.ProductsService;
import com.example.utils.ProductsMapper;
import com.example.entity.Products;
import com.example.entity.ProductsData;
import com.example.service.AppConfigService;

import java.util.ArrayList;
import java.util.List;

public class ProductsMapper {

    public static Products toEntity(ProductsDTO dto) {
        if (dto == null) {
            return null;
        }

        Products entity = new Products();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setPlan_code(dto.getPlan_code());
        entity.setCompany_code(dto.getCompany_code());
        entity.setType(dto.getType());
        entity.setUinNumber(dto.getUinNumber());
        entity.setMin_AgeAtEntry(dto.getMinAgeAtEntry());
        entity.setMax_AgeAtEntry(dto.getMaxAgeAtEntry());
        entity.setMin_MaturityAge(dto.getMinMaturityAge());
        entity.setMax_MaturityAge(dto.getMaxMaturityAge());
        entity.setMin_RegularPremium(dto.getMinRegularPremium());
        entity.setMax_RegularPremium(dto.getMaxRegularPremium());
        entity.setLimitedPremium1(dto.getLimitedPremium1());
        entity.setLimitedPremium2(dto.getLimitedPremium2());
        entity.setLimitedPremium3(dto.getLimitedPremium3());
        entity.setLimitedPremium4(dto.getLimitedPremium4());
        entity.setLaunchDate(dto.getLaunchDate());
        entity.setMin_PolicyTerm(dto.getMinPolicyTerm());
        entity.setMax_PolicyTerm(dto.getMaxPolicyTerm());
        entity.setMin_InstallmentPremiumYearly(dto.getMinInstallmentPremiumYearly());
        entity.setMax_InstallmentPremiumYearly(dto.getMaxInstallmentPremiumYearly());
        entity.setMin_InstallmentPremiumHalfYearly(dto.getMinInstallmentPremiumHalfYearly());
        entity.setMax_InstallmentPremiumHalfYearly(dto.getMaxInstallmentPremiumHalfYearly());
        entity.setMin_InstallmentPremiumQuarterly(dto.getMinInstallmentPremiumQuarterly());
        entity.setMax_InstallmentPremiumQuarterly(dto.getMaxInstallmentPremiumQuarterly());
        entity.setMin_InstallmentPremiumMonthly(dto.getMinInstallmentPremiumMonthly());
        entity.setMax_InstallmentPremiumMonthly(dto.getMaxInstallmentPremiumMonthly());
        entity.setMin_SinglePremiumAmount(dto.getMinSinglePremiumAmount());
        entity.setMax_SinglePremiumAmount(dto.getMaxSinglePremiumAmount());
        entity.setMin_AnnuityPurchasePrice(dto.getMinAnnuityPurchasePrice());
        entity.setMax_AnnuityPurchasePrice(dto.getMaxAnnuityPurchasePrice());
        entity.setMin_SumAssured(dto.getMinSumAssured());
        entity.setMax_SumAssured(dto.getMaxSumAssured());
        entity.setExitDate(dto.getExitDate());
        entity.setChequeClearance(dto.getChequeClearance());
        entity.setClawback(dto.getClawback());
        entity.setBonusCommissionEligibility(dto.getBonusCommissionEligibility());
        entity.setBonusCommissionPercentage(dto.getBonusCommissionPercentage());
        entity.setApproval_status(dto.getApproval_status());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setModifiedBy(dto.getModifiedBy());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    public static ProductsDTO toDto(Products entity) {
        if (entity == null) {
            return null;
        }

        ProductsDTO dto = new ProductsDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPlan_code(entity.getPlan_code());
        dto.setCompany_code(entity.getCompany_code());
        dto.setType(entity.getType());
        dto.setUinNumber(entity.getUinNumber());
        dto.setMinAgeAtEntry(entity.getMin_AgeAtEntry());
        dto.setMaxAgeAtEntry(entity.getMax_AgeAtEntry());
        dto.setMinMaturityAge(entity.getMin_MaturityAge());
        dto.setMaxMaturityAge(entity.getMax_MaturityAge());
        dto.setMinRegularPremium(entity.getMin_RegularPremium());
        dto.setMaxRegularPremium(entity.getMax_RegularPremium());
        dto.setLimitedPremium1(entity.getLimitedPremium1());
        dto.setLimitedPremium2(entity.getLimitedPremium2());
        dto.setLimitedPremium3(entity.getLimitedPremium3());
        dto.setLimitedPremium4(entity.getLimitedPremium4());
        dto.setLaunchDate(entity.getLaunchDate());
        dto.setMinPolicyTerm(entity.getMin_PolicyTerm());
        dto.setMaxPolicyTerm(entity.getMax_PolicyTerm());
        dto.setMinInstallmentPremiumYearly(entity.getMin_InstallmentPremiumYearly());
        dto.setMaxInstallmentPremiumYearly(entity.getMax_InstallmentPremiumYearly());
        dto.setMinInstallmentPremiumHalfYearly(entity.getMin_InstallmentPremiumHalfYearly());
        dto.setMaxInstallmentPremiumHalfYearly(entity.getMax_InstallmentPremiumHalfYearly());
        dto.setMinInstallmentPremiumQuarterly(entity.getMin_InstallmentPremiumQuarterly());
        dto.setMaxInstallmentPremiumQuarterly(entity.getMax_InstallmentPremiumQuarterly());
        dto.setMinInstallmentPremiumMonthly(entity.getMin_InstallmentPremiumMonthly());
        dto.setMaxInstallmentPremiumMonthly(entity.getMax_InstallmentPremiumMonthly());
        dto.setMinSinglePremiumAmount(entity.getMin_SinglePremiumAmount());
        dto.setMaxSinglePremiumAmount(entity.getMax_SinglePremiumAmount());
        dto.setMinAnnuityPurchasePrice(entity.getMin_AnnuityPurchasePrice());
        dto.setMaxAnnuityPurchasePrice(entity.getMax_AnnuityPurchasePrice());
        dto.setMinSumAssured(entity.getMin_SumAssured());
        dto.setMaxSumAssured(entity.getMax_SumAssured());
        dto.setExitDate(entity.getExitDate());
        dto.setChequeClearance(entity.getChequeClearance());
        dto.setClawback(entity.getClawback());
        dto.setBonusCommissionEligibility(entity.getBonusCommissionEligibility());
        dto.setBonusCommissionPercentage(entity.getBonusCommissionPercentage());
        dto.setApproval_status(entity.getApproval_status());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedBy(entity.getModifiedBy());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setStatus(entity.getStatus());

        // Initialize collections for child data
        List<String> intermediaries = new ArrayList<>();
        List<String> frequencies = new ArrayList<>();
        List<String> premiumTypes = new ArrayList<>();

        // Process child data based on category
        for (ProductsData data : entity.getProductsDataList()) {
            switch (data.getCategory()) {
                case "Intermediary":
                    intermediaries.add(data.getConfigKey());
                    break;
                case "Frequency":
                    frequencies.add(data.getConfigKey());
                    break;
                case "Installment Premium":
                    premiumTypes.add(data.getConfigKey());
                    break;
                default:
                    // Handle unexpected categories if needed
                    break;
            }
        }

        dto.setIntermediary(intermediaries);
        dto.setFrequency(frequencies);
        dto.setPremiumtype(premiumTypes);
        return dto;
    }


}
