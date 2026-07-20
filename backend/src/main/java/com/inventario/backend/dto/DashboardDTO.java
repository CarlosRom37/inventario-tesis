package com.inventario.backend.dto;

public class DashboardDTO {

    private Long totalBienes;
    private Long totalMovimientos;

    private Long bienesActivos;
    private Long bienesInactivos;

    private Long bienesCorrientes;
    private Long bienesPatrimoniales;

    private Long alertasStock;

    public DashboardDTO() {
    }

    public Long getTotalBienes() {
        return totalBienes;
    }

    public void setTotalBienes(Long totalBienes) {
        this.totalBienes = totalBienes;
    }

    public Long getTotalMovimientos() {
        return totalMovimientos;
    }

    public void setTotalMovimientos(Long totalMovimientos) {
        this.totalMovimientos = totalMovimientos;
    }

    public Long getBienesActivos() {
        return bienesActivos;
    }

    public void setBienesActivos(Long bienesActivos) {
        this.bienesActivos = bienesActivos;
    }

    public Long getBienesInactivos() {
        return bienesInactivos;
    }

    public void setBienesInactivos(Long bienesInactivos) {
        this.bienesInactivos = bienesInactivos;
    }

    public Long getBienesCorrientes() {
        return bienesCorrientes;
    }

    public void setBienesCorrientes(Long bienesCorrientes) {
        this.bienesCorrientes = bienesCorrientes;
    }

    public Long getBienesPatrimoniales() {
        return bienesPatrimoniales;
    }

    public void setBienesPatrimoniales(Long bienesPatrimoniales) {
        this.bienesPatrimoniales = bienesPatrimoniales;
    }

    public Long getAlertasStock() {
        return alertasStock;
    }

    public void setAlertasStock(Long alertasStock) {
        this.alertasStock = alertasStock;
    }
}