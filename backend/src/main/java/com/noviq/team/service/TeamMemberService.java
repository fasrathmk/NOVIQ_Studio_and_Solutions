package com.noviq.team.service;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.team.dto.TeamMemberResponse;
import com.noviq.team.dto.TeamMemberWriteRequest;
import com.noviq.team.entity.TeamMember;
import com.noviq.team.mapper.TeamMemberMapper;
import com.noviq.team.repository.TeamMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;
    private final TeamMemberMapper mapper;

    public TeamMemberService(TeamMemberRepository teamMemberRepository, TeamMemberMapper mapper) {
        this.teamMemberRepository = teamMemberRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<TeamMemberResponse> listPublic() {
        return teamMemberRepository.findAllByActiveTrueOrderByDisplayOrderAscNameAsc().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TeamMemberResponse> listAdmin() {
        return teamMemberRepository.findAllByOrderByDisplayOrderAscNameAsc().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TeamMemberResponse getAdmin(UUID id) {
        return mapper.toResponse(findById(id));
    }

    @Transactional
    public TeamMemberResponse create(TeamMemberWriteRequest request) {
        TeamMember member = new TeamMember();
        apply(member, request);
        return mapper.toResponse(teamMemberRepository.save(member));
    }

    @Transactional
    public TeamMemberResponse update(UUID id, TeamMemberWriteRequest request) {
        TeamMember member = findById(id);
        apply(member, request);
        return mapper.toResponse(member);
    }

    @Transactional
    public TeamMemberResponse setActive(UUID id, boolean active) {
        TeamMember member = findById(id);
        member.setActive(active);
        return mapper.toResponse(member);
    }

    @Transactional
    public void reorder(IdOrderRequest request) {
        List<TeamMember> members = teamMemberRepository.findAllById(request.ids());
        for (int index = 0; index < request.ids().size(); index++) {
            UUID id = request.ids().get(index);
            int order = index + 1;
            members.stream()
                    .filter(member -> member.getId().equals(id))
                    .findFirst()
                    .ifPresent(member -> member.setDisplayOrder(order));
        }
    }

    @Transactional
    public void delete(UUID id) {
        TeamMember member = findById(id);
        teamMemberRepository.delete(member);
    }

    private void apply(TeamMember member, TeamMemberWriteRequest request) {
        member.setName(request.name().trim());
        member.setRole(request.role().trim());
        member.setBiography(trimToNull(request.biography()));
        member.setImageUrl(trimToNull(request.imageUrl()));
        member.setLinkedinUrl(trimToNull(request.linkedinUrl()));
        member.setBehanceUrl(trimToNull(request.behanceUrl()));
        member.setGithubUrl(trimToNull(request.githubUrl()));
        member.setActive(request.active() == null || request.active());
        member.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
    }

    private TeamMember findById(UUID id) {
        return teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found."));
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
