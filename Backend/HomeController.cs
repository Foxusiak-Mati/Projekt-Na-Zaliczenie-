using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Index(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            ViewBag.NameError = "Imię jest wymagane";
        }
        else if (!name.All(char.IsLetter))
        {
            ViewBag.NameError = "Dozwolone są tylko litery";
        }

        return View();
    }
}
