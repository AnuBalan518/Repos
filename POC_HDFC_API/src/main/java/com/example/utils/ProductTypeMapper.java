package com.example.utils;

import com.example.dto.ProductTypeDTO;
import com.example.entity.ProductType;

public class ProductTypeMapper {

    public static ProductType toEntity(ProductTypeDTO dto) {
        if (dto == null) {
            return null;
        }

        ProductType entity = new ProductType();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setType(dto.getType());
        entity.setIntermediary(dto.getIntermediary());
        entity.setFrequency(dto.getFrequency());
        entity.setInstallmentType(dto.getInstallmentType());
        entity.setUinNumber(dto.getUinNumber());
        entity.setAgeAtEntry(dto.getAgeAtEntry());
        entity.setMaturityAge(dto.getMaturityAge());
        entity.setPremiumTerm(dto.getPremiumTerm());
        entity.setLimitedPremiumTerm(dto.getLimitedPremiumTerm());
        entity.setPolicyTerm(dto.getPolicyTerm());
        entity.setInstallmentPremium(dto.getInstallmentPremium());
        entity.setSinglePremium(dto.getSinglePremium());
        entity.setAnnuityPurchasePrice(dto.getAnnuityPurchasePrice());
        entity.setSumAssured(dto.getSumAssured());
        entity.setProductLaunchDate(dto.getProductLaunchDate());
        entity.setProductExitDate(dto.getProductExitDate());
        entity.setClawback(dto.getClawback());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setApprovalstatus(dto.getApprovalStatus());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    public static ProductTypeDTO toDto(ProductType entity) {
        if (entity == null) {
            return null;
        }

        ProductTypeDTO dto = new ProductTypeDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setType(entity.getType());
        dto.setIntermediary(entity.getIntermediary());
        dto.setFrequency(entity.getFrequency());
        dto.setInstallmentType(entity.getInstallmentType());
        dto.setUinNumber(entity.getUinNumber());
        dto.setAgeAtEntry(entity.getAgeAtEntry());
        dto.setMaturityAge(entity.getMaturityAge());
        dto.setPremiumTerm(entity.getPremiumTerm());
        dto.setLimitedPremiumTerm(entity.getLimitedPremiumTerm());
        dto.setPolicyTerm(entity.getPolicyTerm());
        dto.setInstallmentPremium(entity.getInstallmentPremium());
        dto.setSinglePremium(entity.getSinglePremium());
        dto.setAnnuityPurchasePrice(entity.getAnnuityPurchasePrice());
        dto.setSumAssured(entity.getSumAssured());
        dto.setProductLaunchDate(entity.getProductLaunchDate());
        dto.setProductExitDate(entity.getProductExitDate());
        dto.setClawback(entity.getClawback());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setApprovalStatus(entity.getApprovalstatus());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
