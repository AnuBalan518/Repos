package com.example.service;

import com.example.dto.ProductsDTO;
import com.example.entity.AppConfig;
import com.example.entity.Products;
import com.example.entity.ProductsData;
import com.example.utils.ProductsMapper.*;
import com.example.repository.AppConfigRepository;
import com.example.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.utils.ProductsMapper.toDto;
import static com.example.utils.ProductsMapper.toEntity;

@Service
public class ProductsService {

//	@Autowired
//	private ProductsRepository repository;
//
//	@Autowired
//	private AppConfigRepository appConfigRepository;

	private final ProductsRepository repository;
	private final AppConfigRepository appConfigRepository;

	@Autowired
	public ProductsService(ProductsRepository repository, AppConfigRepository appConfigRepository) {
		this.repository = repository;
		this.appConfigRepository = appConfigRepository;
	}

	public Products save(ProductsDTO productType) {

		return repository.save(toEntity(productType));
	}

	public Products saveProductWithDetails(ProductsDTO productsDTO,
		List<String> intermediaries,
		List<String> premiumtypes,
		List<String> frequencies,
		Integer createdBy) {

		Products saveProducts = toEntity(productsDTO);
		List<ProductsData> productsDataList = new ArrayList<>();

		if (intermediaries != null) {
			for (String intermediary : intermediaries) {
				ProductsData productsData = new ProductsData();
				productsData.setProducts(saveProducts);
				productsData.setCategory("Intermediary");
				productsData.setConfigKey(intermediary);
				productsData.setCreatedBy(createdBy);
				productsData.setModifiedBy(createdBy);
				productsData.setCreatedAt(LocalDateTime.now());
				productsData.setUpdatedAt(LocalDateTime.now());
				productsData.setStatus("A");
				productsDataList.add(productsData);
			}
		}

		if (frequencies != null) {
			for (String frequency : frequencies) {
				ProductsData productsData = new ProductsData();
				productsData.setProducts(saveProducts);
				productsData.setCategory("Frequency");
				productsData.setConfigKey(frequency);
				productsData.setCreatedBy(createdBy);
				productsData.setModifiedBy(createdBy);
				productsData.setCreatedAt(LocalDateTime.now());
				productsData.setUpdatedAt(LocalDateTime.now());
				productsData.setStatus("A");
				productsDataList.add(productsData);
			}
		}

		if (premiumtypes != null) {
			for (String premiumtypedata : premiumtypes) {
				ProductsData productsData = new ProductsData();
				productsData.setProducts(saveProducts);
				productsData.setCategory("Installment Premium");
				productsData.setConfigKey(premiumtypedata);
				productsData.setCreatedBy(createdBy);
				productsData.setModifiedBy(createdBy);
				productsData.setCreatedAt(LocalDateTime.now());
				productsData.setUpdatedAt(LocalDateTime.now());
				productsData.setStatus("A");
				productsDataList.add(productsData);
			}
		}

		saveProducts.setProductsDataList(productsDataList);


		//Products saveProducts = toEntity(products);

		return repository.save(saveProducts);
	}

	public List<ProductsDTO> getAll() {
		List<Products> productTypes = repository.findAll();
		return productTypes.stream().map(this::convertToDto).collect(Collectors.toList());
		//return repository.findAll();
	}

	public Products getProductTypeById (Integer id) {
		Products productType = repository.getProductTypeById(id);

		List<ProductsData> dataList = productType.getProductsDataList();
		productType.setProductsDataList(dataList);
		return productType;
		//return convertToDto(productType);
	}

	public List<ProductsDTO> getAllActive() {
		return repository.findByStatus("A")
				.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public Products updateApprovalStatus(Integer id, String approval_status) {
		Products productType = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		productType.setApproval_status(approval_status); // Assuming there's a setter for approval_status
		return repository.save(productType);
	}


	private ProductsDTO convertToDto(Products pt) {
		ProductsDTO ptDTO = toDto(pt);

		ptDTO.setType(getAppConfigValue("ProductType", ptDTO.getType()));
		ptDTO.setClawback(getAppConfigValue("Applicable", ptDTO.getClawback()));
		ptDTO.setChequeClearance(getAppConfigValue("Applicable", ptDTO.getChequeClearance()));
		ptDTO.setBonusCommissionEligibility(getAppConfigValue("Applicable", ptDTO.getBonusCommissionEligibility()));

		List<String> intermediaries = ptDTO.getIntermediary();
		List<String> config_intemediaries = new ArrayList<String>();
		String config_intermediary = null;
		if (intermediaries != null) {
			for (String intermediary : intermediaries) {
				config_intermediary = getAppConfigValue("Intermediary",
						intermediary);
				config_intemediaries.add(config_intermediary);
			}
			ptDTO.setIntermediary(config_intemediaries);
		}

		List<String> frequencies = ptDTO.getFrequency();
		List<String> config_frequencies = new ArrayList<String>();
		String config_frequency = null;
		if (frequencies != null) {
			for (String frequency : frequencies) {
				config_frequency = getAppConfigValue("Frequency",
						frequency);
				config_frequencies.add(config_frequency);
			}
			ptDTO.setFrequency(config_frequencies);
		}

		List<String> premiumtypes = ptDTO.getPremiumtype();
		List<String> config_premiumtypes = new ArrayList<String>();
		String config_premiumtype = null;
		if (premiumtypes != null) {
			for (String premiumtype : premiumtypes) {
				config_premiumtype = getAppConfigValue("Installment Premium",
						premiumtype);
				config_premiumtypes.add(config_premiumtype);
			}
			ptDTO.setPremiumtype(config_premiumtypes);
		}
		return ptDTO;//toDto(pt);
	}

	public String getAppConfigValue(String category, String configKey) {
		return appConfigRepository.findByCategoryAndConfigKey(category, configKey)
				.map(AppConfig::getConfigValue)
				.orElse(configKey); // fallback to key if not found
	}

	public Optional<Products> update(Integer id, ProductsDTO updatedData) {
		return repository.findById(id).map(existing -> {
			Products updatedEntity = toEntity(updatedData);
			updatedEntity.setId(id);

			// Convert arrays into ProductsData list
			List<ProductsData> updatedProductsDataList = new ArrayList<>();

			// Map frequency keys
			for (String freqKey : updatedData.getFrequency()) {
				ProductsData pd = new ProductsData();
				pd.setCategory("Frequency");
				pd.setConfigKey(freqKey);
				pd.setProducts(updatedEntity);
				pd.setCreatedBy(updatedData.getCreatedBy());
				pd.setModifiedBy(updatedData.getModifiedBy());
				pd.setCreatedAt(updatedData.getCreatedAt());
				pd.setUpdatedAt(updatedData.getUpdatedAt());
				pd.setStatus("A");
				updatedProductsDataList.add(pd);
			}

			// Map intermediary keys
			for (String intermKey : updatedData.getIntermediary()) {
				ProductsData pd = new ProductsData();
				pd.setCategory("Intermediary");
				pd.setConfigKey(intermKey);
				pd.setProducts(updatedEntity);
				pd.setCreatedBy(updatedData.getCreatedBy());
				pd.setModifiedBy(updatedData.getModifiedBy());
				pd.setCreatedAt(updatedData.getCreatedAt());
				pd.setUpdatedAt(updatedData.getUpdatedAt());
				pd.setStatus("A");
				updatedProductsDataList.add(pd);
			}

			// Map premiumtype keys
			for (String premTypeKey : updatedData.getPremiumtype()) {
				ProductsData pd = new ProductsData();
				pd.setCategory("Installment Premium");
				pd.setConfigKey(premTypeKey);
				pd.setCreatedBy(updatedData.getCreatedBy());
				pd.setModifiedBy(updatedData.getModifiedBy());
				pd.setCreatedAt(updatedData.getCreatedAt());
				pd.setUpdatedAt(updatedData.getUpdatedAt());
				pd.setStatus("A");
				pd.setProducts(updatedEntity);
				updatedProductsDataList.add(pd);
			}

			// Replace the existing list with the updated one
			updatedEntity.getProductsDataList().clear();
			updatedEntity.getProductsDataList().addAll(updatedProductsDataList);

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

	public long getCountByApprovalstatusAndStatus(String approval_status) {
		// Assuming 'A' is the status filter
		return repository.countByApprovalstatusAndStatus(approval_status, "A");
	}

}
