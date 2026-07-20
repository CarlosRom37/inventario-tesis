package com.inventario.backend.service;

import com.inventario.backend.dto.DashboardDTO;
import com.inventario.backend.model.Bien;
import com.inventario.backend.model.EstadoBien;
import com.inventario.backend.model.TipoBien;
import com.inventario.backend.repository.BienRepository;
import com.inventario.backend.repository.MovimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private BienRepository bienRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    public DashboardDTO obtenerResumen() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalBienes(
                bienRepository.count()
        );

        dto.setTotalMovimientos(
                movimientoRepository.count()
        );

        dto.setBienesActivos(

                bienRepository.findAll()
                        .stream()
                        .filter(b ->

                                b.getTipoBien() == TipoBien.CORRIENTE ||

                                b.getEstado() != EstadoBien.R

                        )
                        .count()
        );

        dto.setBienesInactivos(

                bienRepository.findAll()
                        .stream()
                        .filter(b ->

                                b.getTipoBien() == TipoBien.PATRIMONIAL &&

                                b.getEstado() == EstadoBien.R

                        )
                        .count()
        );

        dto.setBienesCorrientes(

                bienRepository.findAll()
                        .stream()
                        .filter(b ->
                                b.getTipoBien() == TipoBien.CORRIENTE
                        )
                        .count()
        );

        dto.setBienesPatrimoniales(

                bienRepository.findAll()
                        .stream()
                        .filter(b ->
                                b.getTipoBien() == TipoBien.PATRIMONIAL
                        )
                        .count()
        );

        dto.setAlertasStock(

                bienRepository.findAll()
                        .stream()
                        .filter(b ->

                                b.getStockActual() != null &&
                                b.getStockMinimo() != null &&
                                b.getStockActual() <= b.getStockMinimo()

                        )
                        .count()
        );

        return dto;
    }

}