package com.noviq.team.repository;

import com.noviq.team.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {

    List<TeamMember> findAllByActiveTrueOrderByDisplayOrderAscNameAsc();

    List<TeamMember> findAllByOrderByDisplayOrderAscNameAsc();

    long countByActiveTrue();
}
