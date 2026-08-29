package com.noviq.project.mapper;

import com.noviq.project.dto.ProjectCardResponse;
import com.noviq.project.dto.ProjectDetailResponse;
import com.noviq.project.dto.ProjectImageResponse;
import com.noviq.project.dto.RelatedProjectResponse;
import com.noviq.project.entity.Project;
import com.noviq.project.entity.ProjectImage;
import com.noviq.project.entity.Technology;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class ProjectMapper {

    public ProjectCardResponse toCard(Project project) {
        return new ProjectCardResponse(
                project.getId().toString(),
                project.getTitle(),
                project.getSlug(),
                project.getCategory(),
                project.getShortDescription(),
                project.getCoverImageUrl(),
                project.getCoverImageAlt(),
                technologyNames(project),
                project.isFeatured(),
                project.isDemonstration(),
                project.getStatus(),
                project.getDisplayOrder(),
                project.getProjectYear()
        );
    }

    public ProjectDetailResponse toDetail(Project project, Project previous, Project next) {
        return new ProjectDetailResponse(
                project.getId().toString(),
                project.getTitle(),
                project.getSlug(),
                project.getClientName(),
                project.getIndustry(),
                project.getProjectYear(),
                project.getCategory(),
                project.getShortDescription(),
                project.getCoverImageUrl(),
                project.getCoverImageAlt(),
                project.getOverview(),
                project.getChallenge(),
                project.getApproach(),
                project.getSolution(),
                project.getResults(),
                project.getServicesProvided(),
                technologyNames(project),
                project.getImages().stream()
                        .sorted(Comparator.comparingInt(ProjectImage::getDisplayOrder))
                        .map(this::toImage)
                        .toList(),
                project.getLiveUrl(),
                project.getBehanceUrl(),
                project.getGithubUrl(),
                project.isFeatured(),
                project.isDemonstration(),
                project.getStatus(),
                project.getDisplayOrder(),
                previous == null ? null : toRelated(previous),
                next == null ? null : toRelated(next)
        );
    }

    public ProjectImageResponse toImage(ProjectImage image) {
        return new ProjectImageResponse(
                image.getId() == null ? null : image.getId().toString(),
                image.getImageUrl(),
                image.getAltText(),
                image.getCaption(),
                image.getDisplayOrder()
        );
    }

    public RelatedProjectResponse toRelated(Project project) {
        return new RelatedProjectResponse(
                project.getTitle(),
                project.getSlug(),
                project.getCategory().name(),
                project.getShortDescription(),
                project.getCoverImageUrl(),
                project.getCoverImageAlt()
        );
    }

    private List<String> technologyNames(Project project) {
        return project.getTechnologies().stream()
                .map(Technology::getName)
                .sorted()
                .toList();
    }
}
