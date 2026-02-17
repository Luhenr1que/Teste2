<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdmResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return[
            'idAdm' => $this->idAdm,
            'nomeAdm' => $this->nomeAdm,
            'emailAdm' => $this->emailAdm,
            'status' => $this->status,
        ];
    }
}
