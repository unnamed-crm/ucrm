package contact

import (
	"net/http"

	"github.com/ignavan39/ucrm-go/app/repository"
)

type Controller struct {
	contactRepo repository.ContactRepository
}

func NewController(contactRepo repository.ContactRepository) *Controller {
	return &Controller{
		contactRepo: contactRepo,
	}
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
}

func (c *Controller) Delete(w http.ResponseWriter, r *http.Request) {
}

func (c *Controller) GetOne(w http.ResponseWriter, r *http.Request) {
}

func (c *Controller) Rename(w http.ResponseWriter, r *http.Request) {
}

func (c *Controller) Update(w http.ResponseWriter, r *http.Request) {
}
