package com.noviq.project.service;

import com.noviq.common.exception.ConflictException;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.project.dto.TechnologyResponse;
import com.noviq.project.dto.TechnologyWriteRequest;
import com.noviq.project.entity.Technology;
import com.noviq.project.repository.TechnologyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class TechnologyService {

    private final TechnologyRepository technologyRepository;

    public TechnologyService(TechnologyRepository technologyRepository) {
        this.technologyRepository = technologyRepository;
    }

    @Transactional(readOnly = true)
    public List<TechnologyResponse> list() {
        return technologyRepository.findAllByOrderByNameAsc().stream()
                .map(item -> new TechnologyResponse(item.getId().toString(), item.getName()))
                .toList();
    }

    @Transactional
    public TechnologyResponse create(TechnologyWriteRequest request) {
        String name = request.name().trim();
        if (technologyRepository.existsByNameIgnoreCase(name)) {
            throw new ConflictException("A technology with this name already exists.");
        }
        Technology technology = new Technology();
        technology.setName(name);
        Technology saved = technologyRepository.save(technology);
        return new TechnologyResponse(saved.getId().toString(), saved.getName());
    }

    @Transactional
    public void delete(UUID id) {
        Technology technology = technologyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Technology not found."));
        technologyRepository.delete(technology);
    }
}
