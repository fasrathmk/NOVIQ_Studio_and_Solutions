package com.noviq.team.mapper;

import com.noviq.team.dto.TeamMemberResponse;
import com.noviq.team.entity.TeamMember;
import org.springframework.stereotype.Component;

@Component
public class TeamMemberMapper {

    public TeamMemberResponse toResponse(TeamMember member) {
        return new TeamMemberResponse(
                member.getId().toString(),
                member.getName(),
                member.getRole(),
                member.getBiography(),
                member.getImageUrl(),
                member.getLinkedinUrl(),
                member.getBehanceUrl(),
                member.getGithubUrl(),
                member.isActive(),
                member.getDisplayOrder()
        );
    }
}
