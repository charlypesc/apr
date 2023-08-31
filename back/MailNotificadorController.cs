using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEndV1.Domain.Models;
using BackEndV1.Persistence.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEndV1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailNotificadorController : Controller
    {
        private readonly AplicationDbContext _context;
        public MailNotificadorController(AplicationDbContext context)
        {
            _context = context;
        }
       
        [HttpPost("[action]")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostSubirMailNotificador( MailNotificador  mailNotificador)
        {
            try
            {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                _context.MailNotificador.Add(mailNotificador);
                await _context.SaveChangesAsync();
                return Ok(mailNotificador);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("[action]/{rbd}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetMailNotificadorByRbd(string rbd)
        {
            try
            {
                if (rbd==null)
                {
                    return BadRequest(ModelState);
                }

                var mails = await _context.MailNotificador.Where(x => x.Rbd == rbd)
                                                                 .Select(o => new MailNotificador
                                                                 {
                                                                     Id = o.Id,
                                                                     UsuarioId = o.UsuarioId,
                                                                     PerfilId = o.PerfilId,
                                                                     Mail = o.Mail,
                                                                     Rbd = o.Rbd,
                                                                     Usuario = new Usuario
                                                                     {
                                                                         Nombre = o.Usuario.Nombre,
                                                                         NombreUsuario = o.Usuario.NombreUsuario,

                                                                     },
                                                                     Perfil = new Perfil
                                                                     {
                                                                         Id = o.Perfil.Id,
                                                                         TipoPerfil = o.Perfil.TipoPerfil
                                                                     }
                                                                 }
                                                                  )
                                                                 .ToListAsync();
                
                
                return Ok(mails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("[action]/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteMailNotificadorById(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var mailNotificador = await _context.MailNotificador.Where(a => a.Id == id).FirstOrDefaultAsync();
                _context.MailNotificador.Remove(mailNotificador);
                await _context.SaveChangesAsync();
                
                return Ok(new { message="Eliminado con exito!"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

