package com.example.service;

import com.example.utils.ProductTypeMapper;
import com.example.entity.ProductType;
import com.example.dto.ProductTypeDTO;
import com.example.repository.ProductTypeRepository;
import com.example.entity.AppConfig;
import com.example.repository.AppConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import sun.tools.jconsole.JConsole;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.utils.ProductTypeMapper.toEntity;

@Service
public class ProductTypeService {

	@Autowired
	private ProductTypeRepository repository;

	@Autowired
	private AppConfigRepository appConfigRepository;

	public ProductType save(ProductTypeDTO productType) {
		return repository.save(toEntity(productType));
	}

	public List<ProductTypeDTO> getAll() {
		List<ProductType> productTypes = repository.findAll();
		return productTypes.stream().map(this::convertToDto).collect(Collectors.toList());
		//return repository.findAll();
	}

	public ProductType getProductTypeById (Integer id) {
		ProductType productType = repository.getProductTypeById(id);
		return productType;
		//return convertToDto(productType);
	}

	public List<ProductTypeDTO> getAllActive() {
		return repository.findByStatus("A")
				.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public ProductType updateApprovalStatus(Integer id, String approvalStatus) {
		ProductType productType = repository.findById(id).orElseThrow(() -> new RuntimeException("ProductType not found"));
		productType.setApprovalStatus(approvalStatus); // Assuming there's a setter for approvalStatus
		return repository.save(productType);
	}


	private ProductTypeDTO convertToDto(ProductType pt) {
		ProductTypeDTO dto = new ProductTypeDTO();
		dto.setId(pt.getId());
		dto.setName(pt.getName());
		//dto.setType(pt.getType());
		//dto.setIntermediary(pt.getIntermediary());
		//dto.setFrequency(pt.getFrequency());
		//dto.setInstallmentType(pt.getInstallmentType());

		dto.setType(getConfigValue("ProductType", pt.getType()));
		dto.setIntermediary(getConfigValue("Intermediary", pt.getIntermediary()));
		dto.setFrequency(getConfigValue("Frequency", pt.getFrequency()));
		dto.setInstallmentType(getConfigValue("Installment Premium", pt.getInstallmentType()));

		dto.setUinNumber(pt.getUinNumber());
		dto.setAgeAtEntry(pt.getAgeAtEntry());
		dto.setMaturityAge(pt.getMaturityAge());
		dto.setPremiumTerm(pt.getPremiumTerm());
		dto.setLimitedPremiumTerm(pt.getLimitedPremiumTerm());
		dto.setPolicyTerm(pt.getPolicyTerm());
		dto.setInstallmentPremium(pt.getInstallmentPremium());
		dto.setSinglePremium(pt.getSinglePremium());
		dto.setAnnuityPurchasePrice(pt.getAnnuityPurchasePrice());
		dto.setSumAssured(pt.getSumAssured());
		dto.setProductLaunchDate(pt.getProductLaunchDate());
		dto.setProductExitDate(pt.getProductExitDate());
		dto.setClawback(pt.getClawback());
		dto.setCreatedAt(pt.getCreatedAt());
		dto.setUpdatedAt(pt.getUpdatedAt());
		dto.setApprovalStatus(pt.getApprovalStatus());
		dto.setStatus(pt.getStatus());
		System.out.println("Received Launch Date: " + pt.getProductLaunchDate());
		return dto;
	}

	private String getConfigValue(String category, String configKey) {
		return appConfigRepository.findByCategoryAndConfigKey(category, configKey)
				.map(AppConfig::getConfigValue)
				.orElse(configKey); // fallback to key if not found
	}

	public Optional<ProductType> update(Integer id, ProductTypeDTO updatedData) {
		return repository.findById(id).map(existing -> {
			ProductType updatedEntity = toEntity(updatedData);
			updatedEntity.setId(id);
			return repository.save(updatedEntity);
		});
	}

	public String deleteProductType (int id) {
		//repository.deleteById(id);
		return repository.findById(id).map(existing -> {
			existing.setStatus("D");
			repository.save(existing);
			return "ProductType status updated to 'D'";
		}).orElse("ProductType not found");
		//return "ProductType has been deleted.";
	}

}
