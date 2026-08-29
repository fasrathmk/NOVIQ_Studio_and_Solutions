package com.noviq.inquiry;

import com.noviq.common.exception.BadRequestException;
import com.noviq.inquiry.dto.InquiryCreateRequest;
import com.noviq.inquiry.entity.BudgetRange;
import com.noviq.inquiry.entity.Inquiry;
import com.noviq.inquiry.entity.InquiryStatus;
import com.noviq.inquiry.mapper.InquiryMapper;
import com.noviq.inquiry.repository.InquiryRepository;
import com.noviq.inquiry.service.InquiryService;
import com.noviq.service.entity.ServiceOffering;
import com.noviq.service.repository.ServiceOfferingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InquiryServiceTest {

    @Mock
    private InquiryRepository inquiryRepository;
    @Mock
    private ServiceOfferingRepository serviceOfferingRepository;

    private InquiryService inquiryService;

    @BeforeEach
    void setUp() {
        inquiryService = new InquiryService(inquiryRepository, serviceOfferingRepository, new InquiryMapper());
    }

    @Test
    void createPublicPersistsValidInquiry() {
        when(serviceOfferingRepository.findBySlugAndActiveTrue("web-application-development"))
                .thenReturn(Optional.of(new ServiceOffering()));
        when(inquiryRepository.save(any(Inquiry.class))).thenAnswer(invocation -> {
            Inquiry inquiry = invocation.getArgument(0);
            setId(inquiry, UUID.randomUUID());
            return inquiry;
        });

        var response = inquiryService.createPublic(validRequest(true));

        assertThat(response.status()).isEqualTo(InquiryStatus.NEW);
        assertThat(response.email()).isEqualTo("ada@example.com");
        ArgumentCaptor<Inquiry> captor = ArgumentCaptor.forClass(Inquiry.class);
        org.mockito.Mockito.verify(inquiryRepository).save(captor.capture());
        assertThat(captor.getValue().isConsent()).isTrue();
    }

    @Test
    void createPublicRejectsMissingConsent() {
        assertThatThrownBy(() -> inquiryService.createPublic(validRequest(false)))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Consent");
    }

    @Test
    void createPublicRejectsUnknownService() {
        InquiryCreateRequest request = new InquiryCreateRequest(
                "Ada Lovelace",
                "ada@example.com",
                null,
                null,
                "unknown-service",
                BudgetRange.FROM_300_TO_750,
                null,
                "Please build a complete web application for our studio operations.",
                null,
                true
        );

        assertThatThrownBy(() -> inquiryService.createPublic(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("valid service");
    }

    private InquiryCreateRequest validRequest(boolean consent) {
        return new InquiryCreateRequest(
                "Ada Lovelace",
                "ada@example.com",
                "+94 70 000 0000",
                "Analytical Engines",
                "web-application-development",
                BudgetRange.FROM_750_TO_1500,
                null,
                "Please build a complete web application for our studio operations.",
                null,
                consent
        );
    }

    private void setId(Inquiry inquiry, UUID id) {
        try {
            var field = Inquiry.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(inquiry, id);
        } catch (ReflectiveOperationException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
