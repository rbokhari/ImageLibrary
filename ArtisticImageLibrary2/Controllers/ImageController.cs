using System;
using System.IO;
using System.Linq;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ArtisticImageLibrary2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> logger;
        public ImageController(ILogger<ImageController> logger)
        {
            this.logger = logger;
        }

        [HttpGet(Name = "GetImages")]
        public IActionResult Get()
        {
            var path = @Path.Combine(Directory.GetCurrentDirectory(), "www", "attachments");
            var files = Directory.GetFiles(path);
            if (files!= null && files.Count() > 0)
            {
                var fileNames = files.Select(c => Path.GetFileName(c));
                return Ok(fileNames);
            }
            return NoContent();
        }


        [HttpPost(Name = "postUpload")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Post(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return Content("File not found");

                var path = @Path.Combine(Directory.GetCurrentDirectory(), "www", "attachments", file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // logging error
                logger.LogError(500, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{filename}", Name = "DeleteFile")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete(string filename)
        {
            try
            {
                var path = @Path.Combine(Directory.GetCurrentDirectory(), "www", "attachments", filename);

                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                    return NoContent();
                }
                throw new FileNotFoundException();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void CreateThumbNail(string path)
        {
            
            Image image = Image.FromFile(path);
            Image thumb = image.GetThumbnailImage(120, 120, () => false, IntPtr.Zero);
            thumb.Save(Path.ChangeExtension(path, "thumb"));
        }

    }
}