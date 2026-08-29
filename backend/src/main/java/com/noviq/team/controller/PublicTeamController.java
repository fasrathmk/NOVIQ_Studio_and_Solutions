package com.noviq.team.controller;

import com.noviq.team.dto.TeamMemberResponse;
import com.noviq.team.service.TeamMemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/team")
public class PublicTeamController {

    private final TeamMemberService teamMemberService;

    public PublicTeamController(TeamMemberService teamMemberService) {
        this.teamMemberService = teamMemberService;
    }

    @GetMapping
    public List<TeamMemberResponse> list() {
        return teamMemberService.listPublic();
    }
}
