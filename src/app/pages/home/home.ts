import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  // Telemetria do Veículo (Ford Ranger)
  vehicle = {
    model: 'Ford Ranger Limited 2025',
    fuelLevel: 78,
    tirePressure: '32 PSI (Normal)',
    odometer: 14250,
    status: 'Trancado'
  };

  // Estado da LGPD
  showConsentBanner: boolean = true;
  privacySettings = {
    gpsTracking: true,
    marketingEmails: false,
    telemetrySharing: true
  };

  // Formulário de Agendamento
  bookingForm!: FormGroup;
  bookingSuccess: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Carrega preferências salvas no localStorage (LGPD)
    const savedConsent = localStorage.getItem('ford_lgpd_consent');
    if (savedConsent) {
      this.privacySettings = JSON.parse(savedConsent);
      this.showConsentBanner = false;
    }

    // Inicializa o formulário com validações
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      serviceType: ['Revisão Periódica', Validators.required],
      date: ['', Validators.required]
    });
  }

  // Guardar preferências da LGPD
  saveConsent(): void {
    localStorage.setItem('ford_lgpd_consent', JSON.stringify(this.privacySettings));
    this.showConsentBanner = false;
  }

  // LGPD: Exportar dados do titular
  downloadUserData(): void {
    const userData = {
      user: 'Cliente Ford',
      vehicle: this.vehicle,
      consents: this.privacySettings,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-dados-ford.json';
    a.click();
  }

  // LGPD: Solicitar Exclusão
  deleteUserData(): void {
    if (confirm('Atenção: Sob a LGPD, isto apagará os seus dados pessoais e de telemetria. Confirmar?')) {
      localStorage.removeItem('ford_lgpd_consent');
      alert('Dados eliminados com sucesso do sistema Ford.');
      location.reload();
    }
  }

  // Enviar Agendamento
  onBookingSubmit(): void {
    if (this.bookingForm.valid) {
      this.bookingSuccess = true;
      this.bookingForm.reset();
    }
  }
}