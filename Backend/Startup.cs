using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GaleriaZdjęćFotograficznych
{
    public class Startup
    {
        // Konstruktor klasy Startup
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // Właściwość przechowująca konfigurację aplikacji
        public IConfiguration Configuration { get; }

        // Konfiguracja usług aplikacji
        public void ConfigureServices(IServiceCollection services)
        {
            // Dodanie obsługi kontrolerów z widokami
            services.AddControllersWithViews();
            
            // Dodanie kontekstu bazy danych
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            // Dodanie obsługi Identity z użyciem domyślnych typów użytkownika i roli
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
        }

        // Konfiguracja aplikacji
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Sprawdzenie, czy aplikacja działa w trybie deweloperskim
            if (env.IsDevelopment())
            {
                // Użycie strony z informacjami o błędach w trybie deweloperskim
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Użycie zabezpieczeń HSTS w przypadku działania w środowisku produkcyjnym
                app.UseHsts();
            }

            // Włączenie routingu w aplikacji
            app.UseRouting();

            // Konfiguracja punktów końcowych aplikacji
            app.UseEndpoints(endpoints =>
            {
                // Mapowanie domyślnego kontrolera i akcji
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
