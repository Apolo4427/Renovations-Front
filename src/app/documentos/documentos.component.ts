import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentoService } from '../Services/documento.service';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent implements OnInit {
  private _activatedRouter = inject(ActivatedRoute);
  private _documentosServices= inject(DocumentoService);

  ngOnInit(): void {
      
  }
}
