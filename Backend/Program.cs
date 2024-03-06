using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;

namespace GaleriaZdjęćFotograficznych
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Tworzenie hosta i uruchamianie aplikacji
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    // Konfiguracja serwera Kestrel
                    webBuilder.UseKestrel(options =>
                    {
                        // Nasłuchiwanie na dowolnym adresie IP na porcie 5000
                        options.ListenAnyIP(5000); 
                        // Wyłączenie nagłówka serwera w odpowiedziach HTTP
                        options.AddServerHeader = false;
                        // Ustawienie limitów dla serwera Kestrel
                        options.Limits.MaxConcurrentConnections = 100;
                        options.Limits.MaxConcurrentUpgradedConnections = 100;
                        options.Limits.MaxRequestBodySize = 10 * 1024; // Maksymalny rozmiar ciała żądania HTTP (w bajtach)
                        options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2); // Czas utrzymania połączenia keep-alive
                        options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(30); // Limit czasu na otrzymanie nagłówków żądania
                    });

                    // Konfiguracja aplikacji ASP.NET Core
                    webBuilder.Configure(app =>
                    {
                        // Dodanie middleware do obsługi routingu
                        app.UseRouting();
                        // Konfiguracja punktów końcowych (endpoints) aplikacji
                        app.UseEndpoints(endpoints =>
                        {
                            // Mapowanie ścieżki głównej na obsługę zapytania GET
                            endpoints.MapGet("/", async context =>
                            {
                                // Wysłanie odpowiedzi "Witaj na Stronie!"
                                await context.Response.WriteAsync("Witaj na Stronie!");
                            });
                        });
                    });
                });
    }
}
