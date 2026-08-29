package com.noviq.team.controller;

import com.noviq.common.dto.ActiveUpdateRequest;
import com.noviq.common.dto.IdOrderRequest;
import com.noviq.team.dto.TeamMemberResponse;
import com.noviq.team.dto.TeamMemberWriteRequest;
import com.noviq.team.service.TeamMemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/team")
public class AdminTeamController {

    private final TeamMemberService teamMemberService;

    public AdminTeamController(TeamMemberService teamMemberService) {
        this.teamMemberService = teamMemberService;
    }

    @GetMapping
    public List<TeamMemberResponse> list() {
        return teamMemberService.listAdmin();
    }

    @GetMapping("/{id}")
    public TeamMemberResponse get(@PathVariable UUID id) {
        return teamMemberService.getAdmin(id);
    }

    @PostMapping
    public ResponseEntity<TeamMemberResponse> create(@Valid @RequestBody TeamMemberWriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamMemberService.create(request));
    }

    @PutMapping("/{id}")
    public TeamMemberResponse update(@PathVariable UUID id, @Valid @RequestBody TeamMemberWriteRequest request) {
        return teamMemberService.update(id, request);
    }

    @PatchMapping("/{id}/active")
    public TeamMemberResponse setActive(@PathVariable UUID id, @Valid @RequestBody ActiveUpdateRequest request) {
        return teamMemberService.setActive(id, request.active());
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorder(@Valid @RequestBody IdOrderRequest request) {
        teamMemberService.reorder(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        teamMemberService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
