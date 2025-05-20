/* import jakarta.persistence.*;
import java.util.List;

@Entity
public class Curador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String numeroEmpleado;

    @OneToOne(mappedBy = "curador", cascade = CascadeType.ALL)
    private Sede sede;

    @OneToMany(mappedBy = "curador", cascade = CascadeType.ALL)
    private List<Exposicion> exposiciones;

    // Getters y Setters
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }

    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }

    public Sede getSede() {
        return sede;
    }

    public void setSede(Sede sede) {
        this.sede = sede;
    }

    public List<Exposicion> getExposiciones() {
        return exposiciones;
    }*/