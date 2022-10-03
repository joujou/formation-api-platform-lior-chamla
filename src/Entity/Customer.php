<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(
        ),
        new Post(),
        new Put(),
        new Delete(),
        new GetCollection()
    ],
    normalizationContext: [
        'groups' => ['customer:read']
    ]
)]
#[ApiResource(
    uriTemplate: '/customers/{id}/invoices',
    operations: [new Get()],
    normalizationContext: ['groups' => ['customer:read']],
)]
#[ApiFilter(SearchFilter::class,null,null,["firstName" => "partial", "lastName" => "partial", "company" => "partial"])]
#[ApiFilter(OrderFilter::class)]
#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["customer:read", "invoice:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customer:read", "invoice:read"])]
    #[Assert\NotBlank(message: "Valeur obligatoire")]
    #[Assert\Length(min:3, max: 150, minMessage: 'Trop court', maxMessage: 'Trop grand')]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customer:read", "invoice:read"])]
    #[Assert\NotBlank(message: "Valeur obligatoire")]
    #[Assert\Length(min:3, max: 150, minMessage: 'Trop court', maxMessage: 'Trop grand')]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customer:read", "invoice:read"])]
    #[Assert\NotBlank(message: "Valeur obligatoire")]
    #[Assert\Email(message: "Le format de l'adresse email doit être valide")]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["customer:read", "invoice:read"])]
    private ?string $company = null;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Invoice::class)]
    #[Groups(["customer:read"])]
    private Collection $invoices;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    #[Groups(["customer:read"])]
    #[Assert\NotBlank(message: "User obligatoire")]
    private ?User $user = null;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    /**
     * Total des invoices (champ calculé)
     * @return float
     */
    #[Groups(["customer:read"])]
    public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + $invoice->getAmount();
        }, 0);
    }

    /**
     * Total impayé
     * @return float
     */
    #[Groups(["customer:read"])]
    public function getUnpaidAmount(): float {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + ($invoice->getStatus() === "PAID" || $invoice->getStatus() == "CANCELLED" ? 0 : $invoice->getAmount());
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
